// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
class ObsidianFileExt {
	static get defaultSetting() {return "markdown,mdx,txt"}
	static loadExtensions(setting, runtime) {
		// Convert setting to array
		let exts = setting.split(",");
		exts = exts.map(function (el) {
			return el.trim();
		});

		// register the view and extensions
		runtime.registerExtensions(exts, "markdown");
	}	
}

export default ObsidianFileExt;
  