import { writable } from 'svelte/store';
import type { Payment } from '@/types/Card';

export const payments = writable<Payment[]>([]);
