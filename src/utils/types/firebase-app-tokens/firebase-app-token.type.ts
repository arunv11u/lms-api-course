


export abstract class AppToken {
	abstract set name(name: string);
	abstract set projectId(projectId: string);
	abstract set clientEmail(clientEmail: string);
	abstract set privateKey(privateKey: string);

	abstract init(): void;
	abstract check(token: string): Promise<void>;
}
