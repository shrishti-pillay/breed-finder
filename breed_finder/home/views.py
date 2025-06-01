import json

from django.http import HttpResponse
from django.template import loader

from aws_bedrock_image_search.main import query_results, get_presigned_url

def home(request):
    template = loader.get_template('home.html')
    return HttpResponse(template.render())
    
def search(request):
    try:
        if request.method == 'GET':
            query = request.GET.get('prompt', '')
            results = query_results("text",query)
            if len(results) >= 1:
                best_result = results[0]
                
                img_url = get_presigned_url('breed-finder-v1',"dog7.jpg", 3600 )
                data = {
                    "img_url": img_url
                }
                return HttpResponse(json.dumps(data),content_type="application/json")
            else:
                return HttpResponse("No results found.", status=404)
    except Exception as e:
        return HttpResponse("Invalid request method.", status=405)