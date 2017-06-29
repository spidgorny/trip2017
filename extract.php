<?php

define('BR', PHP_EOL);

class Extract {

	var $temp = [];

	var $places = [];

	function parse()
	{
		$file = __DIR__ . '/scratch.json';
		$json = file_get_contents($file);
		$ctx = json_decode($json);
		foreach ($ctx[1] as $key => $el) {
			//	echo '--', $key, '--', BR;
			if (isset($el[3])) {
				$this->deepDive($el[3]);
			}
		}
		//print_r($this->places);
		file_put_contents('trip2017.json',
			json_encode($this->places, JSON_PRETTY_PRINT));
	}

	function deepDive($ctx)
	{
		foreach ($ctx as $key => $el) {
			//echo '['.$key.']', BR;
			if (is_array($el)) {
				$this->diveDeeper($el);
			} elseif ($el) {
				//			echo '"'.$el.'"', BR;
			}
		}
	}

	function diveDeeper($ctx)
	{
		//check($ctx);
		$key = $ctx[0];
		$val = $ctx[5];
		if (in_array($key, ['lat', 'lng', 'title'])) {
			//		print_r([$key => $val]);
			$this->temp[$key] = end($val);
			if ($key == 'title') {
				$this->saveTempPlace();
			}
		}
	}

	function saveTempPlace() {
		$this->places[] = $this->temp;
	}

	function check($ctx)
	{
		foreach ($ctx as $key => $el) {
			echo '[' . $key . ']', BR;
			if (is_array($el)) {
				print_r(array_keys($el));
			} else {
				echo '"' . $el . '"', BR;
			}
		}
	}

	function check2($ctx)
	{
		foreach ($ctx as $key => $el) {
			echo '[' . $key . ']', BR;
			if (is_array($el)) {
				$this->check($el);
			} else {
				echo '"' . $el . '"', BR;
			}
		}
	}

}

(new Extract())->parse();
