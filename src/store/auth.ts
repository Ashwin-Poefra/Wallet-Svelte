import { writable } from 'svelte/store';

export const token = writable<string | undefined>();

export const user = writable<{ name: string; email: string; picture: string } | null>(null);
