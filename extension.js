const St = imports.gi.St;
const Main = imports.ui.main;

const RunDialog = imports.ui.runDialog;
const Lang = imports.lang;

let basef = RunDialog._run;

function init() {
}

function enable() {
    if (Main.runDialog == null) {
        Main.runDialog = new RunDialog.RunDialog();
    }
    let r = Main.runDialog;
    basef = Lang.bind(r, r._run);

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
        } else {
            basef(input, inTerminal);
        }
    }

    r._run = Lang.bind(r, calculator);
}

function disable() {
    if (Main.runDialog == null) {
        Main.runDialog = new RunDialog.RunDialog();
    }
    let r = Main.runDialog;

    r._run = basef;
}
