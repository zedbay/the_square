import app from './app/app';
process.setMaxListeners(100);
app.listen(8080, () => {
    console.log('Server running on port 8080');
});