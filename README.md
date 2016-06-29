# Illuminance Sensor App with Realtime Graphs

This is a demo app using illuminance sensor and provide realtime graphs with LCD screen and via web as well.

**Web** (using package [home](https://github.com/vilic/ruff-home) as server)

![web](https://cloud.githubusercontent.com/assets/970430/16442489/910a46ca-3e05-11e6-85b3-c7859bcc53f7.jpg)

**LCD**

![lcd](https://cloud.githubusercontent.com/assets/970430/16446000/f4fcccd6-3e17-11e6-9f28-6537fe4c912a.jpg)

## Development Board and Devices

### Development Board

This app has been tested on both `ruff-mbd-v1` (Ruff Main Board V1) and `rpi-2b` (Raspberry Pi 2B).
Please make sure your development board have the latest firmware installed (version 1.2 by now).

- Upgrade RuffOS for `ruff-mbd-v1`: https://ruff.io/zh-cn/docs/firmware-upgrade.html
- Install RuffOS for `rpi-2b`: https://ruff.io/zh-cn/docs/raspberry-pi-getting-started.html

### Devices

This app uses two external devices:

- [lcd1602-02](https://rap.ruff.io/devices/lcd1602-02)
- [gy-30](https://rap.ruff.io/devices/gy-30)

## Install and Layout

First of all, we'll need to install app dependencies, includes modules and drivers for this app.

```sh
rap install
```

Then we need to generate layout information based on your target board, say `rpi-2b`:

```sh
rap layout -b rpi-2b --visual
```

> The default board is `ruff-mbd-v1`, and `-b <board>` option is only required for changing target board.

Rap will download board specific metadata and drivers (if any), then generate layout information and `ruff_box.json` for the app to run on your device.

As `--visual` option is turned on, you should be seeing the visual layout in a browser:

![layout](https://cloud.githubusercontent.com/assets/970430/16445678/613ba70c-3e16-11e6-9b9b-7eba88d6f552.png)

## Scan, Deploy and Start

Execute following commands one by one to find your device, then deploy and start the app.

Please copy the IP address of your device and we'll use that to access web graph later.

```sh
rap scan
rap deploy -s --source
```

> Option `--source` will prevent from rap pre-compiling JavaScript files as we have browser side JavaScript in `static` folder.

If everything goes fine, you should be seeing the LCD updating current illuminance value and a realtime graph by its side.
Now open an browser and visit `http://<device-ip>/` to view the web version.

## License

MIT License.
