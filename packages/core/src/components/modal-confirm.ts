import '../styles/modal-confirm.css';
import '../styles/modal-window.css';
import { ModalWindow } from './modal-window';

export interface ModalConfirmOptions {
	title?: string;
	description?: string;
	confirmText?: string;
	cancelText?: string;
	onConfirm?: () => void;
	onCancel?: () => void;
	onClose?: () => void;
}

export class ModalConfirm {
	private modal: ModalWindow;
	private options: Required<ModalConfirmOptions>;

	private static readonly DEFAULTS: Required<ModalConfirmOptions> = {
		title: 'Confirmation',
		description: 'Are you sure you want to proceed?',
		confirmText: 'Yes',
		cancelText: 'Cancel',
		onConfirm: () => {},
		onCancel: () => {},
		onClose: () => {},
	};

	constructor(options: ModalConfirmOptions = {}) {
		this.options = { ...ModalConfirm.DEFAULTS, ...options };

		this.modal = new ModalWindow({
			title: this.options.title,
			width: 'max-w-sm',
			centerTitle: true,
			content: this.buildContent(),
			footer: this.buildFooter(),
			onClose: () => {
				this.options.onCancel();
				this.options.onClose();
			},
		});
	}

	private buildContent(): HTMLDivElement {
		const body = document.createElement('div');
		body.className = 'k-modal-confirm-body';

		const desc = document.createElement('p');
		desc.className = 'k-modal-confirm-description';
		desc.textContent = this.options.description;

		body.appendChild(desc);
		return body;
	}

	private buildFooter(): HTMLDivElement {
		const footer = document.createElement('div');
		footer.className = 'k-modal-confirm-actions';

		const cancelBtn = document.createElement('button');
		cancelBtn.className = 'k-modal-confirm-btn k-modal-confirm-btn--cancel';
		cancelBtn.textContent = this.options.cancelText;
		cancelBtn.addEventListener('click', () => this.handleCancel());

		const confirmBtn = document.createElement('button');
		confirmBtn.className = 'k-modal-confirm-btn k-modal-confirm-btn--confirm';
		confirmBtn.textContent = this.options.confirmText;
		confirmBtn.addEventListener('click', () => this.handleConfirm());

		footer.appendChild(cancelBtn);
		footer.appendChild(confirmBtn);
		return footer;
	}

	private handleConfirm(): void {
		this.options.onConfirm();
		this.close();
	}

	private handleCancel(): void {
		this.options.onCancel();
		this.close();
	}

	public open(): void {
		this.modal.open();
	}

	public close(): void {
		this.modal.close();
	}

	public updateOptions(newOptions: Partial<ModalConfirmOptions>): void {
		this.options = { ...this.options, ...newOptions };
		this.modal.updateOptions({ title: this.options.title });
	}

	public destroy(): void {
		this.modal.destroy();
	}
}
