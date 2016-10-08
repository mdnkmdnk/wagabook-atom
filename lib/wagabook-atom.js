'use babel';

import WagabookAtomView from './wagabook-atom-view';
import { CompositeDisposable } from 'atom';

export default {

  wagabookAtomView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.wagabookAtomView = new WagabookAtomView(state.wagabookAtomViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.wagabookAtomView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'wagabook-atom:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.wagabookAtomView.destroy();
  },

  serialize() {
    return {
      wagabookAtomViewState: this.wagabookAtomView.serialize()
    };
  },

  toggle() {
    console.log('WagabookAtom was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
