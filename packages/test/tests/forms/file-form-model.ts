import { getLabel } from '@self/utils';

import { FormPage } from './form-page-model';

export class FileFormPage extends FormPage {
	async setFile(fileName: string, filePath: string) {
		await this.page.getByLabel(getLabel('fileName')).fill(fileName);
		await this.page.getByLabel('File', { exact: true }).setInputFiles(filePath);
	}
}
