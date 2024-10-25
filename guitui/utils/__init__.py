import os
import tomllib

def get_terminal_size():
    size = os.get_terminal_size()
    print('w/h',size)
    return size

# TODO: configure this from `.toml` file
_stub_parsed_layout = [
    ['header','header','header',],
    ['sidebar', 'content', 'content',],
    ['sidebar', 'content', 'content', ],
    ['sidebar', 'content', 'content', ],
    ['footer', 'footer', 'footer', ],
]
def determine_tui_section_indexes(full_grid_dimensions):
    print('full_terminal_grid_data',full_grid_dimensions)
    print('NEXT STEP: create full mapping of sections to indexes here')
    print('https://github.com/urwid/urwid')
    return 'determine_tui_section_indexes'

def parse_toml_file(path:str):
    with open(path, "rb") as f:
        data = tomllib.load(f)
    return data

def parse_toml_str(toml_str:str):
    data = tomllib.loads(toml_str)
    return data
