import alt from './alt';

class HarActions {

    loadHar(json) {
        this.dispatch(json);

        return new Promise(function(resolve, reject){

        });

    }

    loadHarUrl(url) {
        this.dispatch(url);
    }
}

export default alt.createActions(HarActions);