<html>
	<head>
		<title>Oh hey this is also a page I guess</title>
	</head>
	<body>
		<?php
		if ($_POST['name'] == FALSE || $_POST['age'] == FALSE) {
		?> 
		You forgot to fill in one or more of the fields, numbnuts.
		<?php
		} else if ((int)$_POST['age'] == 0) {
		?> 
		That's not a proper number, you moran!
		<?php
		} else {
		?> 
		Greetings, <?php echo htmlspecialchars($_POST['name']); ?>.
		I have been waiting for you since <?php echo (int)$_POST['age']; ?>.
		<?php
		}
		?> 
	</body>
</html>
