<html>
	<head>
		<title>Vebjorrs' testside</title>
	</head>
	<body>
		<h1>Blarghlebloop.</h1>
		<?php echo '<p>Beep boop, son. Beep boop.</p>'; ?> 
		<p>
		<?php
		echo $_SERVER['HTTP_USER_AGENT'];
		if (strpos($_SERVER['HTTP_USER_AGENT'], 'MSIE') !== FALSE) {
		?> 
		<br /> You are using Internet Explorer. Shame on you.
			<br />
		<?php
		} else {
		?> 
		<br /> Well, at least you're not using Internet Explorer. <br />
		</p>
		<?php
		}
		?>
		<p />
		<form action="action.php" method="post">
			<p>Who are you? <input type="text" name="name" /></p>
			<p>When did you get here? <input type="text" name="age" /></p>
			<p><input type="submit" /></p>
		</form>
		</body>
</html>
