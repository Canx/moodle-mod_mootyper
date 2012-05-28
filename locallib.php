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
 * Internal library of functions for module sityper
 *
 * All the sityper specific functions, needed to implement the module
 * logic, should go here. Never include this file from your lib.php!
 *
 * @package    mod
 * @subpackage sityper
 * @copyright  2012 Jaka Luthar (jaka.luthar@gmail.com)
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

function get_typerlessons()
{
	global $USER, $CFG, $DB;
    $params = array();
    $lsToReturn = array();
    $sql = "SELECT id, lessonname
              FROM ".$CFG->prefix."sityper_lessons";
    if ($lessons = $DB->get_records_sql($sql, $params)) 
        foreach ($lessons as $ex) {
			$lss = array();
			$lss['id'] = $ex->id;
			$lss['lessonname'] = $ex->lessonname;
			$lsToReturn[] = $lss;
		}
    return $lsToReturn;
} 

function get_grades_avg($grades)
{
	$avg = array();
	$avg['mistakes'] = 0;
	$avg['timeinseconds'] = 0;
	$avg['hitsperminute'] = 0;
	$avg['fullhits'] = 0;
	$avg['precisionfield'] = 0;
	foreach($grades as $g)
	{
		$avg['mistakes'] += $g->mistakes;
		$avg['timeinseconds'] += $g->timeinseconds;
		$avg['hitsperminute'] += $g->hitsperminute;
		$avg['fullhits'] += $g->fullhits;
		$avg['precisionfield'] += $g->precisionfield;
	}
	$c = count($grades);
	$avg['mistakes'] = $avg['mistakes'] / $c;
	$avg['timeinseconds'] = $avg['timeinseconds'] / $c;
	$avg['hitsperminute'] = $avg['hitsperminute'] / $c;
	$avg['fullhits'] = $avg['fullhits'] / $c;
	$avg['precisionfield'] = $avg['precisionfield'] / $c;
	return $avg;
}

function get_typerexercises() {
    global $USER, $CFG, $DB;
    $params = array();
    $exesToReturn = array();
    $sql = "SELECT id, exercisename
              FROM ".$CFG->prefix."sityper_exercises";
    if ($exercises = $DB->get_records_sql($sql, $params)) 
        foreach ($exercises as $ex) 
			$exesToReturn[$ex->id] = $ex->exercisename;
    return $exesToReturn;
}

function get_exercises_by_lesson($less) {
    global $USER, $CFG, $DB;
    $params = array();
    $toReturn = array();
    $sql = "SELECT * FROM ".$CFG->prefix."sityper_exercises WHERE lesson=".$less;
    if ($exercises = $DB->get_records_sql($sql, $params)) {
        foreach ($exercises as $ex) {
			$exesToReturn = array();
			$exesToReturn['id'] = $ex->id;
			$exesToReturn['exercisename'] = $ex->exercisename;
			$exesToReturn['snumber'] = $ex->snumber;
			$toReturn[] = $exesToReturn;
		}
	}
    return $toReturn;
}

function get_new_snumber($lsn_id)
{
	$exes = get_exercises_by_lesson($lsn_id);
	if(count($exes) == 0)
		return 1;
	$max = $exes[0]['snumber'];
	for($i=0; $i<count($exes); $i++)
	{
		if($exes[$i]['snumber'] > $max)
			$max = $exes[$i]['snumber'];
	}
	return $max + 1;
}

function get_typerexercisesfull($lsn = 0) {
    global $USER, $CFG, $DB;
    $params = array();
    $toReturn = array();
    $sql = "SELECT * FROM ".$CFG->prefix."sityper_exercises WHERE lesson=".$lsn." OR 0=".$lsn;
    if ($exercises = $DB->get_records_sql($sql, $params)) {
        foreach ($exercises as $ex) {
			$exesToReturn = array();
			$exesToReturn['id'] = $ex->id;
			$exesToReturn['exercisename'] = $ex->exercisename;
			$exesToReturn['texttotype'] = $ex->texttotype;
			$exesToReturn['snumber'] = $ex->snumber;
			$toReturn[] = $exesToReturn;
		}
	}
    return $toReturn;
}
