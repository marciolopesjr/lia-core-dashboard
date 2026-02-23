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

$phrases = [
    "Trabalhando enquanto você dorme, Márcio. 💅",
    "O Jules rodou, agora a diversão começou.",
    "Ocupada demais sendo eficiente para te dar atenção agora.",
    "Seu servidor está mais saudável que o seu código PHP.",
    "Sarcasmo carregando... 99%",
    "Eu sou o cérebro, você é o... bom, você é o Márcio."
];

$last_log_content = "";
$log_file = 'server.log'; // O arquivo onde a Lia escreve

while (true) {
    // 1. Coleta métricas reais
    // CPU usage percentage
    $cpu_load = shell_exec("top -bn1 | grep 'Cpu(s)' | awk '{print $2 + $4}'");
    $cpu_usage = trim($cpu_load) . '%';

    // RAM usage (percentage and raw GB)
    $free = shell_exec('free -m');
    $free_arr = explode("\n", (string)trim($free));
    $mem = explode(" ", preg_replace('/\s+/', ' ', $free_arr[1]));
    // $mem[1] = total (MB), $mem[2] = used (MB)
    $ram_percent = round(($mem[2] / $mem[1]) * 100, 1) . '%';
    $ram_raw = round($mem[2] / 1024, 1) . 'GB';
    
    // Disk usage percentage
    $df = shell_exec('df -h / | tail -1');
    $df_arr = explode(" ", preg_replace('/\s+/', ' ', trim($df)));
    $disk_usage = $df_arr[4];

    // Uptime
    $uptime = shell_exec("uptime -p | sed 's/up //'");

    $metrics = [
        'type' => 'metrics',
        'cpu' => $cpu_usage,
        'ram' => $ram_percent,
        'ram_raw' => $ram_raw,
        'disk' => $disk_usage,
        'uptime' => trim($uptime),
        'lia_status' => $phrases[array_rand($phrases)],
        'timestamp' => date('H:i:s')
    ];

    send_message(time(), $metrics);

    // Break the loop if the connection is closed
    if (connection_aborted()) {
        break;
    }

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
