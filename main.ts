import { App, Plugin, PluginSettingTab, Setting } from 'obsidian';
import ObsidianFileExt from './src/ObsidianFileExt';

// Remember to rename these classes and interfaces!

interface ManagerSettings {
	extensions: string;
}

const DEFAULT_SETTINGS: ManagerSettings = {
	extensions: ObsidianFileExt.defaultSetting
}

export default class ExtensionManager extends Plugin {
	settings: ManagerSettings;

	async onload() {
		await this.loadSettings();

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SampleSettingTab(this.app, this));

		// Register custome file extensions
		ObsidianFileExt.loadExtensions(this.settings.extensions, this);
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SampleSettingTab extends PluginSettingTab {
	plugin: ExtensionManager;

	constructor(app: App, plugin: ExtensionManager) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;
		containerEl.empty();
		containerEl.createEl('h2', {text: 'Settings for managing extensions.'});
		new Setting(containerEl)
			.setName('File Extensions')
			.setDesc('Comma delimited list of file extensions')
			.addText(text => text
				.setPlaceholder('Enter your extensions')
				.setValue(this.plugin.settings.extensions)
				.onChange(async (value) => {
					console.log('Secret: ' + value);
					this.plugin.settings.extensions = value;
					await this.plugin.saveSettings();
				}));
	}
}
