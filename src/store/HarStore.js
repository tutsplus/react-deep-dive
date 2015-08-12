import alt from './alt';
import HarActions from './HarActions';


class HarStore {

    constructor() {
        this.bindListeners({
            loadUrl: HarActions.loadUrl,
            loadHar: HarActions.loadHar
        });

        this.state = {
            hars: [],
            activeHar: null
        };
    }

    loadUrl(json) {
        this._setState(json);
    }

    loadHar(json) {
        this._setState(json);
    }

    _setState(json) {
        this.setState({
            hars: this.state.hars.concat(json),
            activeHar: json
        });
    }
}

export default alt.createStore(HarStore, 'HarStore');