export default {

    // Adapted from: http://stackoverflow.com/a/14919494/419712
    fileSize(bytes) {
        var thresh = 1024;
        if (Math.abs(bytes) < thresh) {
            return `${bytes} B`;
        }
        var units = ['kB', 'MB', 'GB', 'TB'];
        var u = -1;
        do {
            bytes /= thresh;
            ++u;
        } while (Math.abs(bytes) >= thresh && u < units.length - 1);

        return `${bytes.toFixed(1)} ${units[u]}`;
    },

    time(ms) {
        var time = Math.round(ms);

        if (time < 0) {
            return '--';
        }

        if (time < 1000) {
            return `${time} ms`;
        }

        return `${time / 1000} s`;
    }
};