package Threads;


public class MutualExclusion {
	
	public static void main(String[] args) {
		
		
		Data data = new Data();
		data.value =100;
		Producer producer = new Producer(data);
		Consumer consumer = new Consumer(data);
		Thread thread = new Thread(consumer);
		producer.start();
		thread.start();

	}
	
}
