export interface ModalContent {
	title: string;
	description: string;
	onConfirm: () => Promise<void>;
	deletePrompt: string;
}
