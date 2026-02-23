<?php
/**
 * LIA_SYSTEM v4.5 - Real-time Logs Bridge (SSE)
 * Este script lê o log da Lia e o uso do sistema em tempo real.
 */
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
header('Connection: keep-alive');
header('Access-Control-Allow-Origin: *');

function send_message($id, $data) {
    echo "id: $id" . PHP_EOL;
    echo "data: " . json_encode($data) . PHP_EOL;
    echo PHP_EOL;
    ob_flush();
    flush();
}

$last_log_content = "";
$log_file = 'server.log'; // O arquivo onde a Lia escreve

while (true) {
    // 1. Coleta métricas reais
    $load = sys_getloadavg();
    $free = shell_exec('free -m');
    $free_arr = explode("\n", (string)trim($free));
    $mem = explode(" ", preg_replace('/\s+/', ' ', $free_arr[1]));
    
    $df = shell_exec('df -h /');
    $df_arr = explode("\n", trim($df));
    $root = explode(" ", preg_replace('/\s+/', ' ', $df_arr[1]));

    $metrics = [
        'type' => 'metrics',
        'cpu' => $load[0] . '%',
        'ram' => round(($mem[2] / $mem[1]) * 100, 1) . '%',
        'disk' => $root[4],
        'timestamp' => date('H:i:s')
    ];

    send_message(time(), $metrics);

    // 2. Verifica se há novos logs
    if (file_exists($log_file)) {
        $current_log = shell_exec("tail -n 5 $log_file");
        if ($current_log !== $last_log_content) {
            $last_log_content = $current_log;
            send_message(time(), [
                'type' => 'log',
                'content' => nl2br(htmlspecialchars($current_log))
            ]);
        }
    }

    // 3. Espera 2 segundos para o próximo push
    sleep(2);
}
