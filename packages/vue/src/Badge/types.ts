import type { Component } from 'vue'

export type BadgeVariant = "default" | "secondary" | "destructive" | "outline" | "ghost";
export type BadgeSize = "lg" | "md" | "sm"

export interface BadgeProps {
  variant: BadgeVariant
  size: BadgeSize
  text: string
  bg?: string
  icon?: Component
  iconStart?: Component
  iconEnd?: Component
  link?: string
}