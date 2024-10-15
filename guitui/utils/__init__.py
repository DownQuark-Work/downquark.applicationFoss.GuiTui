import os
import tomllib

def get_terminal_size():
    size = os.get_terminal_size()
    print('w/hh',size)
    return size

def determine_tui_section_indexes(full_grid_dimensions):
    print('full_terminal_grid_data',full_grid_dimensions)
    return 'determine_tui_section_indexes'

def parse_toml_file(path:str):
    with open(path, "rb") as f:
        data = tomllib.load(f)
    return data

def parse_toml_str(toml_str:str):
    data = tomllib.loads(toml_str)
    return data
