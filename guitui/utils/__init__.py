import os

def get_terminal_size():
    size = os.get_terminal_size()
    print('w/hh',size)