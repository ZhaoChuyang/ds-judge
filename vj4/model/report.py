import itertools
from bson import objectid
from pymongo import ReturnDocument
import datetime

from vj4.util import argmethod
from vj4.db import mdb
from vj4.model import builtin


def file_rename(course_id, type, student, data, file_extension):
  # 数据结构报告
  if course_id == 0:
    return "%s.%s-%s-%s-实验%s.%s" % (
      str(int(student['year']))[-2:],
      student['_class'],
      str(student['_id'])[1:],
      student['name'],
      builtin.NUMBER_TRANSLATE[data['report_id']],
      file_extension
    )
  if course_id == 3:
    if type == 'report':
      return "%s.%s-%s-%s-实验%s.%s" % (
        str(int(student['year']))[-2:],
        student['_class'],
        str(student['_id'])[1:],
        student['name'],
        builtin.NUMBER_TRANSLATE[data['report_id']],
        file_extension
      )
    elif type == 'code':
      return "%s.%s-%s-%s-实验%s-代码.%s" % (
        str(int(student['year']))[-2:],
        student['_class'],
        str(student['_id'])[1:],
        student['name'],
        builtin.NUMBER_TRANSLATE[data['report_id']],
        file_extension
      )

  return None




