import { FormPage } from './form-page-model';

export class FileFormPage extends FormPage {
	async setFile(fileName: string, filePath: string) {
		await this.page.getByLabel('File Name').fill(fileName);
		await this.page.getByLabel('File *').setInputFiles(filePath);
	}
}
