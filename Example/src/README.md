
#### Scrolling
Scrolling is currently [buggy for iOS](https://developers.perfectomobile.com/pages/viewpage.action?pageId=25199704)
instead we need to do: 
```javascript
await driver.execute('mobile: scroll', { direction: 'right' });
```

### Keyboard
You may get an error about the keyboard, in this case disable hardware keyboard in the simulator
under **Hardware** -> **Keyboard**