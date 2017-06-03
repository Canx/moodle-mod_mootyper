<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * This file adds grade and performance info to an exercise page while the user is typing.
 *
 * @package    mod_mootyper
 * @copyright  2012 Jaka Luthar (jaka.luthar@gmail.com)
 * @copyright  2016 onwards AL Rachels (drachels@drachels.com)
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later.
 */

//defined('MOODLE_INTERNAL') || die('Direct access to this script is forbidden.');

require_once(dirname(dirname(dirname(__FILE__))).'/config.php');
require_once(dirname(__FILE__).'/locallib.php');

global $DB;

$record = new stdClass();
$record->mootyper = $_POST['rpSityperId'];
$record->userid = $_POST['rpUser'];
$record->grade = 0;
$record->mistakes = $_POST['rpMistakesInput'];
$record->timeinseconds = $_POST['rpTimeInput'];
$record->hitsperminute = $_POST['rpSpeedInput'];
$record->fullhits = $_POST['rpFullHits'];
$record->precisionfield = $_POST['rpAccInput'];
$record->timetaken = time();
$record->exercise = $_POST['rpExercise'];
$record->pass = 0;
$record->attemptid = $_POST['rpAttId'];
// Modification needed to prevent negative WPM entries.
$record->wpm = (max(0, (($record->hitsperminute / 5) - $record->mistakes)));
$DB->insert_record('mootyper_grades', $record, false);
$webdir = $CFG->wwwroot . '/course/view.php?id='.$_POST['rpCourseId'];
header('Location: '.$webdir);
