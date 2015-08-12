import alt from './alt';
import constants from '../core/constants'

class HarActions {

    loadSampleHar() {
        this.actions.loadHar(constants.samples.nyt);
    }

    loadHar(url) {
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.dispatch(data)
            });
    }
}

export default alt.createActions(HarActions);