import { AccountKit } from '@wharfkit/account';
import ContractKit from '@wharfkit/contract';
import SessionKit, { APIClient, Chains, Session } from '@wharfkit/session';
import { TransactPluginResourceProvider } from '@wharfkit/transact-plugin-resource-provider';
import { WalletPluginAnchor } from '@wharfkit/wallet-plugin-anchor';
import { WalletPluginPrivateKey } from '@wharfkit/wallet-plugin-privatekey';
import { WalletPluginScatter } from '@wharfkit/wallet-plugin-scatter';
import { WalletPluginTokenPocket } from '@wharfkit/wallet-plugin-tokenpocket';
import { WalletPluginWombat } from '@wharfkit/wallet-plugin-wombat';
import WebRenderer from '@wharfkit/web-renderer';
import { writable, type Writable } from 'svelte/store';

import { Contract as SystemContract } from './contracts/eosio';
export * as SystemContract from './contracts/drops';

import { Contract as TokenContract } from './contracts/eosio-token';
export * as TokenContract from './contracts/drops';

import { Contract as DropsContract } from './contracts/drops';
export * as DropsContract from './contracts/drops';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
export const url = urlParams.get('node') || 'https://jungle4.greymass.com';

const debugWallet = new WalletPluginPrivateKey('KEY');

export const client = new APIClient({ url });
export const accountKit = new AccountKit(Chains.EOS, { client });
export const contractKit = new ContractKit({
	client
});

export const systemContract = new SystemContract({ client });
export const tokenContract = new TokenContract({ client });
export const dropsContract: DropsContract = new DropsContract({ client });

export const sessionKit = new SessionKit(
	{
		appName: 'Drops',
		chains: [
			{
				id: Chains.Jungle4.id,
				url
			}
		],
		ui: new WebRenderer({ minimal: true }),
		walletPlugins: [
			debugWallet,
			new WalletPluginAnchor(),
			new WalletPluginTokenPocket(),
			new WalletPluginScatter(),
			new WalletPluginWombat()
		]
	},
	{
		transactPlugins: [new TransactPluginResourceProvider()]
	}
);

export const session: Writable<Session | undefined> = writable();

export async function login() {
	const result = await sessionKit.login();
	session.set(result.session);
}

export async function logout() {
	await sessionKit.logout();
	session.set(undefined);
}

export async function restore() {
	const restored = await sessionKit.restore();
	session.set(restored);
}
