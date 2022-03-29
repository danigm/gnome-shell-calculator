const St = imports.gi.St;
const Main = imports.ui.main;

const RunDialog = imports.ui.runDialog;

let basef = RunDialog._run;

function init() {
}

function enable() {
    if (Main.runDialog == null) {
        Main.runDialog = new RunDialog.RunDialog();
    }
    let r = Main.runDialog;
    basef = r._run.bind(r);

    function calculator(input, inTerminal) {
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
            basef(input, inTerminal);
        }
    }

    r._run = calculator.bind(r);
}

function disable() {
    if (Main.runDialog == null) {
        Main.runDialog = new RunDialog.RunDialog();
    }
    let r = Main.runDialog;

    r._run = basef;
}
