### Procedure
Hardware Setup

* Connect any GPIO pin to one of the pins of the button.
* Connect the other pin of the button to any of the GND pins of the Raspberry Pi.
* Make a connection between the Raspberry Pi and the LED's anode pin via any of the GPIO pins.
  * Double-click on any of the GPIO pins to start wiring.
  * Make a clear path to the anode of the LED pin.
  * Double-click on the anode of the LED pin to complete the connection.
* The pin requires low voltage, so place a resistor between the Raspberry Pi and the LED.
  * Double-click on the cathode to start wiring between the resistor and the LED pin.
  * Choose any of the resistor pins to complete the wiring.
* Connect the other resistor pin to any of the GND pins of the Raspberry Pi.
* Click the push button to test the circuit and turn on the LED.

 The code section can be opened by clicking the **CODE** button on the right upper side of the simulation area
_Enter the GPIO pin number of the button and led to the code section_

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
