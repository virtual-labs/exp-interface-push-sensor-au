### Procedure
Hardware Setup-
* We will be using two terminal push button rather than a four terminal push button.
* Connect one wire between Raspberry Pi’s Physical Pin 16 (GPI023).
* Connect another wire between Raspberry Pi’s GND.
* As an output device, a 5mm LED is utilized. The Raspberry Pi's Physical Pin 18 (GPIO24) is linked to the anode of the LED (long lead). 
* The terminal of a 100 resistor is connected to the cathode (short lead) of an LED.
* GND is linked to the resistor's other terminal.
Software Setup-
Control the push button for turning on the LED with Python 3 on Raspberry Pi OS –
* After the hardware and software have been set up correctly, pressing the push button will cause the Raspberry Pi running Python 3 to turn on the LED. The LED will be turned on for two seconds before being turned off using this software.
* To control all GPIOs on the Raspberry Pi via the GPIO header, we first import the RPi.GPIO Python module. 
* The Raspberry Pi initializes the LED Pin as an output and the Button Pin as an input with an internal pull-up when the Python script is executed.
* Now, it waits for the Input pin to change state, which only occurs when the button is pressed. Here we have also included the time module for 0.2 seconds.
* Pushing the button causes Raspberry Pi to detect a LOW on the associated pin, which turns on the LED.

Python Code -

    import RPi.GPIO as GPIO
    import time
    button = 16
    led    = 18
    def setup():
       GPIO.setmode(GPIO.BOARD)
       GPIO.setup(button, GPIO.IN, pull_up_down=GPIO.PUD_UP)
       GPIO.setup(led, GPIO.OUT)
    def loop():
        while True:
              button_state = GPIO.input(button)
              if  button_state == False:
                  GPIO.output(led, True)
                  print('Button Pressed...')
                  while GPIO.input(button) == False:
                    time.sleep(0.2)
              else:
                  GPIO.output(led, False)
    def endprogram():
         GPIO.output(led, False)
         GPIO.cleanup()
    if __name__ == '__main__':
          setup()
          try:
                 loop()
          except KeyboardInterrupt:
                 print 'keyboard interrupt detected' 
                   endprogram() 
