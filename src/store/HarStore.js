import alt from './alt';
import HarActions from './HarActions';

class HarStore {

    constructor() {
        this.bindListeners({
            loadHar: HarActions.loadHar
        });

        this.state = {
            hars: [],
            activeHar: null
        };
    }

    loadHar(json) {
        this.setState({
            hars: this.state.hars.concat(json)
        });
    }
}

export default alt.createStore(HarStore, 'HarStore');