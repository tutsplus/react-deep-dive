import alt from './alt';
import HarActions from './HarActions';


class HarStore {

    constructor() {
        this.bindListeners({
            loadSampleHar: HarActions.loadSampleHar
        });

        this.state = {
            hars: [],
            activeHar: null
        };
    }

    loadSampleHar(json) {
        this.setState({
            hars: this.state.hars.concat(json),
            activeHar: json
        });
    }
}

export default alt.createStore(HarStore, 'HarStore');