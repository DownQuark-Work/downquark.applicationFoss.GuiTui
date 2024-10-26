from utils import get_terminal_size, determine_tui_section_indexes

def set_terminal_grid():
     (columns, lines) = get_terminal_size()
     ret_obj = {
         'cols':columns,
         'rows':lines,
         'tot':columns*lines
     }
     return ret_obj

def good_fibonacci(n):
    """Return pair of Fibonacci numbers, F(n) and F(n-1)."""
    if n <= 1:
        return n,0
    else:
        x = n - 1
        (a, b) = good_fibonacci(x)
    return a+b, a

if __name__ == '__main__':
    print('HERE WE GO: starting point for scaffold: https://github.com/MartinHeinz/python-project-blueprint/tree/master/blueprint')
    print('proof of concept::running')
    print('get_terminal_size', get_terminal_size())
    print('set_terminal_grid',set_terminal_grid())
    print('determine_tui_section_indexes', determine_tui_section_indexes(set_terminal_grid()))
    print('good_fibonacci', good_fibonacci(10))

