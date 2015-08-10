import alt from './alt';
import constants from '../core/constants'

class HarActions {

    loadSampleHar() {
        fetch(constants.sampleHarUrl)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.dispatch(data)
            });
    }

    loadHarUrl(url) {
        this.dispatch(url);
    }
}

export default alt.createActions(HarActions);