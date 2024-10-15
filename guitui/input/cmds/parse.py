import argparse

"""Handle CLI Input Commands"""
parser = argparse.ArgumentParser(description='procedural configuration', prog="dq", usage="dq [options]")
parser.add_argument('dimensions', metavar='Dimensions: int int', type=int, nargs='*',
                    default=[8, 17],
                    help='1-2 integers (depending subparser_ for the width and height of the procedural')
parser.add_argument('seed', metavar='<seed>', type=int, nargs='?',
                    default=-1,
                    help='integer to seed the prng value')

procedural_parsers = parser.add_subparsers(title="procedural", dest="procgen")

def build_arg_parser():
    return parser.parse_args()

