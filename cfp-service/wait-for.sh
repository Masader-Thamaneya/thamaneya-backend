host="$1"
shift
cmd="$@"

echo "⏳ Waiting for $host:3306..."

until nc -z "$host" 3306; do
  sleep 1
done

echo "✅ $host is up. Running command..."
exec $cmd
