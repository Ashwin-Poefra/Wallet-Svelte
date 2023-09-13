import type { Address } from '@/types/Address';
import type { CreditCard } from '@/types/CreditCard';

export interface Payment {
	id: string;
	name: string;
	last_digits: string;
	expiration: string;
	network: string;
}

export interface FullPayment {
	name: string;
	card: CreditCard;
	address: Address;
}
