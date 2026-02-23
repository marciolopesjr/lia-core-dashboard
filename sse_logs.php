<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
header('Connection: keep-alive');
header('Access-Control-Allow-Origin: *');

$log_file = 'server.log';

// Function to send SSE message
function send_log($message) {
    echo "data: " . json_encode(['message' => $message]) . "\n\n";
    if (ob_get_level() > 0) {
        ob_flush();
    }
    flush();
}

// Initial check
if (!file_exists($log_file)) {
    touch($log_file);
}

$handle = fopen($log_file, 'r');
if (!$handle) {
    echo "data: " . json_encode(['message' => 'ERROR: Could not open log file.']) . "\n\n";
    exit;
}

// Go to the end of the file
fseek($handle, 0, SEEK_END);
$last_pos = ftell($handle);

// Also send the last 20 lines to provide some context
$lines = shell_exec("tail -n 20 " . escapeshellarg($log_file));
if ($lines) {
    foreach (explode("\n", trim($lines)) as $line) {
        if ($line) send_log($line);
    }
}

while (true) {
    clearstatcache();
    $current_size = filesize($log_file);

    if ($current_size > $last_pos) {
        fseek($handle, $last_pos);
        while ($line = fgets($handle)) {
            send_log(trim($line));
        }
        $last_pos = ftell($handle);
    } elseif ($current_size < $last_pos) {
        // File was truncated or rotated
        fseek($handle, 0);
        $last_pos = ftell($handle);
    }

    if (connection_aborted()) {
        fclose($handle);
        break;
    }

    usleep(500000); // Sleep for 0.5 seconds
}
