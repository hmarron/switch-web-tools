# switch-web-tools

## Server

### Running the server
1. Navigate to `server/` directory.

2. Edit `config.json` and put your local `192.168.*.*` ip address into the `local_dns` `address` field and the `ctest.cdn.nintendo.net` dns record.

3. Run `sudo python switch_server.py`

#### Notes
The ip address you put in the `ctest.cdn.nintendo.net` is the page the switch browser will open.  

This MUST be an ip address NOT a URL.  

If you want to open the switch browser on a particular url, I recommend using a redirect in the html header of `www/index.html`  

## Configuring your switch
1. Open the settings menu

2. Go to `Internet` -> `Internet Settings`

3. Select the network you are connected to (must be the same network as the server) and select `Change Settings`

4. Scroll down and find `DNS Settings`

5. Set the `DNS Settings` to `Manual`

6. Set the `Primary DNS` to the same `192.168.*.*` address of the server

7. Save settings

8. `Connect to this Network`

9. You will get an error that says you need to sign in. Click next and it will open up the browser
