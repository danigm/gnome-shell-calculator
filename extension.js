import St from 'gi://St';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import { RunDialog } from 'resource:///org/gnome/shell/ui/runDialog.js';

const basef = RunDialog.prototype._run;


export default class Calc {
    constructor() {
    }

    enable() {
        RunDialog.prototype._run = function(input, inTerminal) {
            this._commandError = false;
            let value = "";
            if (input.match(/^=([\d\+\-\*\/\(\) \.]+)$/)) {
                try {
                    value = String(eval(input.substr(1)));
                } catch (e) {
                    value = "error: " + String(e.message);
                }
                this._entryText.set_text('=' + value);
                this._showError(value);
                Main.notify(value, '');

                let clipboard = St.Clipboard.get_default();
                clipboard.set_text(St.ClipboardType.CLIPBOARD, value);
            } else {
                basef.bind(this)(input, inTerminal);
            }
        };
    }

    disable() {
        RunDialog.prototype._run = basef;
    }
}
