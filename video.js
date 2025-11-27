<script>
    // Simple Canvas Drawing (HTML5)
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#3b82f6";       // blue rectangle
    ctx.fillRect(20, 20, 120, 80);

    ctx.fillStyle = "#22c55e";       // green circle
    ctx.beginPath();
    ctx.arc(200, 120, 40, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#fff";
    ctx.font = "20px Arial";
    ctx.fillText("Canvas Demo", 80, 200);
</script>