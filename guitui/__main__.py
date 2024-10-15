from utils import get_terminal_size, determine_tui_section_indexes

def set_terminal_grid():
     (columns, lines) = get_terminal_size()
     ret_obj = {
         'cols':columns,
         'rows':lines,
         'tot':columns*lines
     }
     return ret_obj

if __name__ == '__main__':
    print('proof of concept::running')
    print('get_terminal_size', get_terminal_size())
    print('set_terminal_grid',set_terminal_grid())
    print('determine_tui_section_indexes', determine_tui_section_indexes(set_terminal_grid()))
