import unittest

from backend.updater import is_newer_version, version_parts
from backend.version import APP_VERSION


class UpdaterTests(unittest.TestCase):
    def test_version_parts_normalizes_release_tags(self):
        self.assertEqual(version_parts("v0.1.1"), (0, 1, 1))
        self.assertEqual(version_parts("0.2.0"), (0, 2, 0))
        self.assertEqual(version_parts("v1.0.0-beta"), (1, 0, 0))

    def test_is_newer_version_compares_semantic_parts(self):
        self.assertTrue(is_newer_version("v0.1.2", "0.1.1"))
        self.assertTrue(is_newer_version("v0.2.0", "0.1.9"))
        self.assertFalse(is_newer_version(APP_VERSION, APP_VERSION))
        self.assertFalse(is_newer_version("v0.1.0", "0.1.1"))


if __name__ == "__main__":
    unittest.main()
