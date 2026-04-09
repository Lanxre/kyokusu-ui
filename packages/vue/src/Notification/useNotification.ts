import { ref } from "vue";
import type { NotificationItem, NotificationPayload } from "./NotificationItem.vue";

const notifications = ref<NotificationItem[]>([]);

const duplicateMap = new Map<
    string,
    {
        timer: ReturnType<typeof setTimeout> | null;
        next: NotificationPayload | null;
    }
>();

const THROTTLE_DELAY = 3000;

const remove = (id: string) => {
    notifications.value = notifications.value.filter((n) => n.id !== id);
};

const pushNotification = (payload: NotificationPayload) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 9);
    const duration = payload.duration !== undefined ? payload.duration : 5000;

    const item: NotificationItem = {
        type: "info",
        ...payload,
        duration,
        id,
    };

    notifications.value.push(item);

    if (duration > 0) {
        setTimeout(() => {
            remove(id);
        }, duration);
    }
};

const notify = (payload: NotificationPayload) => {
    const key = `${payload.title}|${payload.content || ""}`;

    if (duplicateMap.has(key)) {
        const entry = duplicateMap.get(key)!;
        entry.next = payload;
        return;
    }

    pushNotification(payload);

    const entry = {
        timer: null as ReturnType<typeof setTimeout> | null,
        next: null as NotificationPayload | null,
    };
    duplicateMap.set(key, entry);

    const startCooldown = () => {
        entry.timer = setTimeout(() => {
            if (entry.next) {
                pushNotification(entry.next);
                entry.next = null;
                startCooldown();
            } else {
                duplicateMap.delete(key);
            }
        }, THROTTLE_DELAY);
    };

    startCooldown();
};

export function useNotificationProvider() {
    return {
        notifications,
        notify,
        remove,
    };
}