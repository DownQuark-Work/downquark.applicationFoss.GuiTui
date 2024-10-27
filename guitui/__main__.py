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
    print('before the patterns:: https://fpgmaas.github.io/cookiecutter-poetry/')
    print('-=-=')
    print('HERE WE GO: starting point for scaffold: https://github.com/MartinHeinz/python-project-blueprint/tree/master/blueprint')
    print('and perhaps this as the followup: https://github.com/faif/python-patterns/blob/master/patterns/structural/3-tier.py')
    # more extendables:
    # https://github.com/faif/python-patterns/blob/master/patterns/behavioral/chaining_method.py <- method1(0).do_method_two(2).and_another_method().do_method_two(22)
    #  https://github.com/faif/python-patterns/blob/master/patterns/other/blackboard.py
    # https://github.com/faif/python-patterns/blob/master/patterns/other/hsm/hsm.py
    # https://github.com/faif/python-patterns/blob/master/patterns/behavioral/specification.py
    # https://github.com/faif/python-patterns/blob/master/patterns/behavioral/observer.py
    # https://github.com/faif/python-patterns/blob/master/patterns/behavioral/publish_subscribe.py
    # https://github.com/faif/python-patterns/blob/master/patterns/behavioral/registry.py
    # https://github.com/faif/python-patterns/blob/master/patterns/behavioral/specification.py
    # https://github.com/faif/python-patterns/blob/master/patterns/structural/composite.py

    print('proof of concept::running')
    print('get_terminal_size', get_terminal_size())
    print('set_terminal_grid',set_terminal_grid())
    print('determine_tui_section_indexes', determine_tui_section_indexes(set_terminal_grid()))
    print('good_fibonacci', good_fibonacci(10))

