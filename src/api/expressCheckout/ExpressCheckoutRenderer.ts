import { utils } from '../../index';

class ExpressCheckoutRenderer {
    public payWithConnect(intention: any): Promise<any> {
        return new Promise((resolve, reject) => {

            //GET THE APPROVAL URL
            const approval_link = (<any[]>intention.links)
                .find(link => {
                    return link.rel === 'approval_url';
                });

            if (!approval_link) {
                return reject(new Error('the response links has not a approval_url'));
            }

            const height = 600;
            const width = 450;
            const left = (screen.width / 2) - (width / 2);
            const top = (screen.height / 2) - (height / 2);
            const browser_features = [
                'toolbar=0',
                'location=0',
                'directories=0',
                'status=0',
                'menubar=0',
                'scrollbars=0',
                'resizable=0',
                'copyhistory=0',
                'alwaysRaised=1',
                `width=${width}`,
                `height=${height}`,
                `top=${top}`,
                `left=${left}`
            ].join(',');

            let finaly = false;
            const opener = window.open(approval_link.href, 'peinau_dialog', browser_features);

            const host_to_match = (() => {
                const pathArray = approval_link.href.split('/');
                const protocol = pathArray[0];
                const host = pathArray[2];
                const url = protocol + '//' + host;
                return {
                    path: approval_link.href.split('/'),
                    scheme: protocol,
                    host: host,
                    url: url
                };
            })();

            const fn = (e) => {
                if (!finaly && e.origin.indexOf(host_to_match.url) === 0) {
                    finaly = true;

                    if (removeEvent) {
                        removeEvent(); // Remove event
                    }

                    if (!e.data) {
                        return reject(new Error('postmessage failure'));
                    }

                    //Check if the payment was success or rejected
                    if (e.data.response_code === 0) {
                        resolve(e.data);
                    } else {
                        reject(e.data);
                    }

                    //[SDK Communication]
                    //Send a command to close the opener window =)!
                    opener.postMessage({
                        type: 'command',
                        value: 'close'
                    }, host_to_match.url);

                }
            };
            const removeEvent = utils.events.bind(window, 'message', fn);

            //console.log(intention);
            //console.log($this);
        });
    }
}

const expressCheckoutRenderer = new ExpressCheckoutRenderer();
export { expressCheckoutRenderer };