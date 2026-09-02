from __future__ import annotations

import re
import struct
import unittest
from pathlib import Path

from backend.version import APP_VERSION


ROOT = Path(__file__).resolve().parents[1]


class ReleasePackagingTests(unittest.TestCase):
    def test_release_versions_stay_aligned(self):
        self.assertEqual(APP_VERSION, "0.1.6")

        expected = {
            ROOT / "frontend" / "js" / "app.js": 'FALLBACK_APP_VERSION = "0.1.6"',
            ROOT / "installer" / "mompy.iss": '#define AppVersion "0.1.6"',
            ROOT / "installer" / "setup_windows.py": 'APP_VERSION = "0.1.6"',
            ROOT / "scripts" / "build_windows_installer.ps1": '[string]$Version = "0.1.6"',
            ROOT / "scripts" / "test_windows_installer.ps1": '[string]$Version = "0.1.6"',
            ROOT / "installer" / "windows_version_info.txt": 'ProductVersion", "0.1.6"',
        }
        for path, marker in expected.items():
            with self.subTest(path=path.name):
                self.assertIn(marker, path.read_text(encoding="utf-8"))

    def test_installer_uses_stable_identity_and_hepter_branding(self):
        inno = (ROOT / "installer" / "mompy.iss").read_text(encoding="utf-8")
        self.assertIn("AppId={{4C87759E-8E62-4ECF-B04D-73C63F54EF74}", inno)
        self.assertIn('#define AppPublisher "Hepter Studios"', inno)
        self.assertIn("WizardImageFile=assets\\mompy-hepter-wizard.bmp", inno)
        self.assertIn("WizardSmallImageFile=assets\\hepter-wizard-small.bmp", inno)
        self.assertNotRegex(inno, re.compile(r"chevel", re.IGNORECASE))

    def test_installer_brand_bitmaps_have_inno_dimensions(self):
        expected = {
            ROOT / "installer" / "assets" / "mompy-hepter-wizard.bmp": (164, 314),
            ROOT / "installer" / "assets" / "hepter-wizard-small.bmp": (55, 55),
        }
        for path, dimensions in expected.items():
            with self.subTest(path=path.name):
                header = path.read_bytes()[:26]
                self.assertEqual(header[:2], b"BM")
                self.assertEqual(struct.unpack_from("<ii", header, 18), dimensions)

    def test_every_python_use_case_reuses_the_inline_continue_control(self):
        app = (ROOT / "frontend" / "js" / "app.js").read_text(encoding="utf-8")
        start = app.index("function updateClassroomCardsMompyAction()")
        end = app.index("function resetClassroomAutomationCodePanel", start)
        implementation = app[start:end]
        self.assertIn("state.activeCodePanel?.root.isConnected", implementation)
        self.assertIn(
            "showClassroomAutomationContinue(state.activeCodePanel, state.cardsContinueHandler)",
            implementation,
        )
        self.assertNotIn('state.activeCardDemoKind === "automation-sync"', implementation)

    def test_long_code_panels_follow_the_active_execution_line(self):
        app = (ROOT / "frontend" / "js" / "app.js").read_text(encoding="utf-8")
        start = app.index("function setClassroomAutomationCurrentLine")
        end = app.index("function typeClassroomUseCaseCode", start)
        implementation = app[start:end]
        self.assertIn("panel.scrollCode", implementation)
        self.assertIn("activeRow.offsetTop", implementation)
        self.assertIn("listing.scrollTo", implementation)
        self.assertIn('behavior: prefersReducedMotion() ? "auto" : "smooth"', implementation)


if __name__ == "__main__":
    unittest.main()
