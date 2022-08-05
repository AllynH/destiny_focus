# -*- coding: utf-8 -*-
"""Python 2/3 compatibility module."""
import sys

PY2 = int(sys.version[0]) == 2

if PY2:
    text_type = unicode  # noqa
    binary_type = str
    string_types = (str, unicode)  # noqa
    unicode = unicode  # noqa pylint: disable=self-assigning-variable
    basestring = basestring  # noqa pylint: disable=E0602,self-assigning-variable
else:
    text_type = str
    binary_type = bytes
    string_types = (str,)
    unicode = str
    basestring = (str, bytes)
